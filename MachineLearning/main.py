import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from textblob import TextBlob
import neattext.functions as nfx
from sklearn.svm import SVC
import nltk
nltk.download('omw-1.4')
from nltk.stem import WordNetLemmatizer
from flask import Flask, request, jsonify

data = pd.read_csv(r"C:\Users\Roxana\PycharmProjects\BlissfullyML\dataset_2\train.txt", sep=';')
data.columns = ['Text', 'Emotion']

def get_sentiment_for_emotion(text):
    blob = TextBlob(text)
    sentiment = blob.sentiment.polarity
    if sentiment > 0:
        result = 'Positive'
    elif sentiment < 0:
        result = 'Negative'
    else:
        result = 'Neutral'
    return result

data['Sentiment'] = data['Text'].apply(get_sentiment_for_emotion)

def preprocess_text(text, excluded_words=['feel', 'like', 'im', 'time', 'know', 'think', 'want', 'dont']):
    text = text.lower()
    text = nfx.remove_stopwords(text)
    text = nfx.remove_userhandles(text)
    text = nfx.remove_punctuations(text)
    text = nfx.remove_special_characters(text)

    tokens = text.split()
    filtered_tokens = [token for token in tokens if token not in excluded_words]

    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(token, pos='v') for token in filtered_tokens]
    lemmatized_text = ' '.join(lemmatized_tokens)

    return lemmatized_text

data['Clean_Text'] = data['Text'].apply(preprocess_text)

X = data['Clean_Text']
y = data['Emotion']
tfidf = TfidfVectorizer()
X = tfidf.fit_transform(X)

svm_model = SVC(kernel='linear', gamma='auto', C=1.0, probability=True)
svm_model.fit(X, y)

app = Flask(__name__)

@app.route('/predict_sentiment', methods=['POST'])
def predict_sentiment():
    req_data = request.get_json()
    journal_entry = req_data['journal_entry']
    vect = tfidf.transform([journal_entry]).toarray()
    prediction = svm_model.predict(vect)
    confidence = np.max(svm_model.predict_proba(vect))
    sentiment = get_sentiment_for_emotion(journal_entry)
    return jsonify({
        'emotion': prediction[0],
        'confidence': float(confidence),
        'sentiment': sentiment
    })


if __name__ == '__main__':
    app.run(debug=True, port=5006)