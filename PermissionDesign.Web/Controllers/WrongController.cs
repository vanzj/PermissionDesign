using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PermissionDesign.Web.Controllers
{
    public class WrongController : Controller
    {
        public ActionResult Index(string wrongContent = " 服务器好像出错了...", string returnUrl = "/Home/Index")
        {
            ViewData["wrongContent"] = wrongContent;
            ViewData["returnUrl"] = returnUrl;
            return View();
        }
    }
}