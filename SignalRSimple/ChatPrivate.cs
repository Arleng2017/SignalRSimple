using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRSimple
{
    public class ChatPrivate : Hub
    {
        public Task SendPrivateMessage(string userid, string message)
        {
            var x = Context.ConnectionId;
            return  Clients.User(userid).SendAsync("ReceiveMessage",message);
        }
    }
}
