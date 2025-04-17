using Blissfully.Application.Contracts;
using Blissfully.Application.Persistence;
using Blissfully.Infrastructure.Repositories;
using Blissfully.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Blissfully.Infrastructure
{
    public static class InfrastructureRegistrationDI
    {
        public static IServiceCollection AddInfrastructureToDI(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<BlissfullyContext>(
                options =>
                options.UseNpgsql(
                    configuration.GetConnectionString
                    ("BlissfullyConnection"),
                    builder =>
                    builder.MigrationsAssembly(
                        typeof(BlissfullyContext)
                        .Assembly.FullName)));

            services.AddScoped
                (typeof(IAsyncRepository<>),
                typeof(BaseRepository<>));
            services.AddScoped
                <IActivityRepository, ActivityRepository>();
            services.AddScoped
                <IJournalEntryRepository, JournalEntryRepository>();
            services.AddScoped
                <IMaterialRepository, MaterialRepository>();
            services.AddScoped
                <ITherapistFeedbackRepository, TherapistFeedbackRepository>();
            services.AddScoped
                <IPatientTherapistRepository, PatientTherapistRepository>();
            services.AddScoped
                <INoteRepository, NoteRepository>();
            services.AddScoped
                <ITestRepository, TestRepository>();
            services.AddScoped
                <ITestQuestionRepository, TestQuestionRepository>();
            services.AddScoped
                <ITestTextRepository, TestTextRepository>();
            services.AddScoped
                <IPatientTestAnswerRepository, PatientTestAnswerRepository>();
            services.AddScoped
                <IPatientTestAssignmentRepository, PatientTestAssignmentRepository>();
            services.AddScoped
                <IAppointmentRepository, AppointmentRepository>();
            services.AddScoped
                <IEmailService, EmailService>();
            services.AddScoped
                <IEncryptionService, EncryptionService>();
            services.AddScoped
                <IFirebaseService, FirebaseService>();
            services.AddScoped
                <INewsService, NewsService>();
            services.AddScoped
                <IOpenAiService, OpenAiService>();
            return services;
        }
    }
}
