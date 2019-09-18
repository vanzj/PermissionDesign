using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PermissionDesign.Model;
using PermissionDesign.Model.Entity;
using PermissionDesign.Model.Response;
using PermissionDesign.Service;
using PermissionDesign.Tool;

namespace PermissionDesign.Web.Controllers
{
    public class RoleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}