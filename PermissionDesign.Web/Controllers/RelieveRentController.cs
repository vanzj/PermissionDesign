﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PermissionDesign.Model;

using PermissionDesign.Tool;

namespace PermissionDesign.Web.Controllers
{
    public class RelieveRentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}