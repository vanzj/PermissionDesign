using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using PermissionDesign.Model;
using PermissionDesign.Model.Entity;
using PermissionDesign.Service;
using PermissionDesign.Tool;

namespace PermissionDesign.Web.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}