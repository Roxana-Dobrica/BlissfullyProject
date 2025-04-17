//using Blissfully.Application.Persistence;
//using Blissfully.Domain.Entities;
//using MediatR;

//namespace Blissfully.Application.Features.Messages.Commands.CreateMessage
//{
//    public class CreateMessageCommandHandler : IRequestHandler<CreateMessageCommand, CreateMessageCommandResponse>
//    {
//        private readonly IMessageRepository repository;

//        public CreateMessageCommandHandler(IMessageRepository repository)
//        {
//            this.repository = repository;
//        }

//        public async Task<CreateMessageCommandResponse> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
//        {
//            var validator = new CreateMessageCommandValidator();
//            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

//            if (!validatorResult.IsValid)
//            {
//                return new CreateMessageCommandResponse
//                {
//                    Success = false,
//                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
//                };
//            }

//            var message = Message.Create(request.SenderId, request.ReceiverId, request.MessageContent);
//            if (!message.IsSuccess)
//            {
//                return new CreateMessageCommandResponse
//                {
//                    Success = false,
//                    ValidationsErrors = new List<string> { message.Error }
//                };
//            }

//            await repository.AddAsync(message.Value);
//            return new CreateMessageCommandResponse
//            {
//                Success = true,
//                Message = new CreateMessageDto
//                {
//                    SenderId = message.Value.SenderId,
//                    ReceiverId = message.Value.ReceiverId,
//                    MessageContent = message.Value.MessageContent
//                }
//            };
//        }
//    }
//}
