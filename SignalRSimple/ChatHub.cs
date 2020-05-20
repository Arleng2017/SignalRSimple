using Microsoft.AspNetCore.SignalR;
using SignalRSimple.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRSimple
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.Caller .SendAsync("ReceiveMessage", user, message);
        }

        public async Task AddProduct(string productName,string productPrice)
        {
            await Clients.All.SendAsync("ReceiveProduct", productName, productPrice);
        }

        public async Task AddStudent(StudentModel student)
        {
            await Clients.All.SendAsync("ReceiveNewStudent", student);
        }

    }
}
