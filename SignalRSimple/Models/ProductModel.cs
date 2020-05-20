using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace SignalRSimple.Models
{
    public class ProductModel
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string ProductName { get; set; }
        public string ProductPrice { get; set; }

    }
}
