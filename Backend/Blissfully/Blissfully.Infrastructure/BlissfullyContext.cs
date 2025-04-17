using Blissfully.Application.Contracts.Interfaces;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure
{
    public class BlissfullyContext : DbContext
    {
        public BlissfullyContext(DbContextOptions<BlissfullyContext> options, ICurrentUserService currentUserService) : base(options)
        {
            this.currentUserService = currentUserService;
        }

        private readonly ICurrentUserService currentUserService;
        public DbSet<Activity> Activities { get; set; }
        public DbSet<JournalEntry> JournalEntries { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<TherapistFeedback> TherapistFeedbacks { get; set; }
        public DbSet<PatientTherapist> PatientsTherapists { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestQuestion> TestQuestions { get; set; }
        public DbSet<TestText> TestTexts { get; set; }
        public DbSet<PatientTestAnswer> PatientTestAnswers { get; set; }
        public DbSet<PatientTestAssignment> PatientTestAssignments { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            foreach (Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<AuditableEntity> entry in ChangeTracker.Entries<AuditableEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedBy = currentUserService.GetCurrentClaimsPrincipal()?.Claims.FirstOrDefault(c => c.Type == "name")?.Value!;
                    entry.Entity.CreatedDate = DateTime.UtcNow;
                }

                if (entry.State == EntityState.Added || entry.State == EntityState.Modified)
                {
                    entry.Entity.LastModifiedBy = currentUserService.GetCurrentClaimsPrincipal()?.Claims.FirstOrDefault(c => c.Type == "name")?.Value!;
                    entry.Entity.LastModifiedDate = DateTime.UtcNow;
                }
            }
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }
}
