using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class Activity : AuditableEntity
    {
        private Activity(Guid userId, string activityTitle, DateTime activityDueDate) 
        {
            ActivityId = Guid.NewGuid();
            UserId = userId;
            ActivityTitle = activityTitle;
            ActivityDueDate = activityDueDate.Date;
            ActivityDateAdded = DateTime.UtcNow.Date;
            IsActivityCompleted = false;
        }
        public Guid ActivityId { get; private set; }
        public Guid UserId { get; private set; }
        public string ActivityTitle { get; private set; } = string.Empty;
        public string? ActivityDescription { get; private set; }
        public DateTime ActivityDateAdded { get; private set; }
        public DateTime ActivityDueDate { get; private set; }
        public bool IsActivityCompleted { get; private set; }

        public static Result<Activity> Create(Guid userId, string activityTitle, DateTime activityDueDate)
        {
            if (string.IsNullOrWhiteSpace(activityTitle))
            {
                return Result<Activity>.Failure("Activity title cannot be empty");
            }
            if (activityDueDate == DateTime.MinValue)
            {
                return Result<Activity>.Failure("Activity due date is required");
            }
            return Result<Activity>.Success(new Activity(userId, activityTitle, activityDueDate));
        }

        public void Update(string activityTitle, string activityDescription, DateTime activityDueDate, bool isActivityCompleted)
        {
            if (!string.IsNullOrWhiteSpace(activityTitle))
            {
                ActivityTitle = activityTitle;
            }
            if (activityDueDate != DateTime.MinValue)
            {
                ActivityDueDate = activityDueDate.Date;
            }
            ActivityDescription = activityDescription;
            IsActivityCompleted = isActivityCompleted;
        }

        public void AttachDescription(string activityDescription)
        {
            if (!string.IsNullOrWhiteSpace(activityDescription))
            {
                ActivityDescription = activityDescription;
            }
        }
        public void MarkActivityAsCompleted()
        {
            IsActivityCompleted = true;
        }
    }
}
