using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SignalRSimple.Models;

namespace SignalRSimple
{
    public class ChatGroup : Hub
    {
        public static List<PersonModel> personList = new List<PersonModel>();
        public Task SendMessageToGroup(string groupName, string message)
        {
           return Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId}: {message}");
        }

     

        public async Task IsOnline(string displayname)
        {
            if (!personList.Any(it => it.Id.Contains(Context.ConnectionId))) { 
                    personList.Add(new PersonModel {
                    Id = Context.ConnectionId,
                    DisplayName = displayname
                }) ;
            }
            await Clients.All.SendAsync("UserOnline" , displayname);
        }

        public Task SendPrivateMessage(string user, string message)
        {
            var userSend = personList.Where(it=>it.Id== Context.ConnectionId)
                .Select(it=>it.DisplayName)
                .FirstOrDefault(); 

            var userReceive = personList.Where(it => it.DisplayName == user)
                .Select(it=>it.Id)
                .FirstOrDefault();

           return  Clients.Client(userReceive).SendAsync("ReceiveMessage", userSend, message);
        }
    }
}
