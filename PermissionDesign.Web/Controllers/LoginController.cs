using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using PermissionDesign.Model;
using PermissionDesign.Model.Entity;
using PermissionDesign.Model.Response;
using PermissionDesign.Service;
using PermissionDesign.Tool;

namespace PermissionDesign.Web.Controllers
{
    public class LoginController : Controller
    {
        private LoginService _loginService;

        public LoginController(LoginService loginService)
        {
            _loginService = loginService;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Login()
        {
            string account = Request.Form["username"];
            string pw = Request.Form["Password"];
            string isRememberPass = Request.Form["j_Remember"];

            if (!_loginService.AccountExit(c => c.LoginAccount == account))
                return Json(new { result = false, data = "account isn't exit" });
            var loginResult = _loginService.Login(account, pw);
            if (loginResult.code == 200)
            {
                if (isRememberPass == "true")
                    CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsRememberPassKey), "1", DateTime.Now.AddDays(7), Request, Response);
                CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsRememberPassKey), Request, Response);

                CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginCookieKey), account + "&&&" + pw, DateTime.Now.AddDays(7), Request, Response);
                var user = loginResult.data as Response_User;
                CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), "1", DateTime.Now.AddMinutes(1), Request, Response);
                CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginAccountKey), account, Request, Response);
                CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingRoleIdKey), user.RoleId.ToString(), Request, Response);
                CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingNameKey), user.Name, Request, Response);
                return Json(new { result = true, data = "Login Success" });

            }
            else
            {
                CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), "0", Request, Response);
                CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginCookieKey), Request, Response);
                CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginAccountKey), Request, Response);
                CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingRoleIdKey), Request, Response);
                CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingNameKey), Request, Response);

                return Json(new { result = false, data = loginResult.data });
            }
        }

        [HttpPost]
        public JsonResult LoginOut()
        {
            CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), "0", Request, Response);
            CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginCookieKey), Request, Response);
            CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginAccountKey), Request, Response);
            CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingRoleIdKey), Request, Response);
            CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingNameKey), Request, Response);

            return Json("true");
        }
        [HttpPost]
        public JsonResult AutoLogin()
        {   // 如果是正在登录
            if (CookieHelper.SingleTon().GetCookieValue(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), Request) == "1")
            {
                string str = CookieHelper.SingleTon().GetCookieValue(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginCookieKey), Request);
                if (!string.IsNullOrEmpty(str))
                {
                    string[] arr = str.Split(new char[3] { '&', '&', '&' });

                    if (!_loginService.AccountExit(c => c.LoginAccount == arr[0]))
                        return Json(new { result = false, data = "account isn't exit", dataType = "AutoLogin" });
                    var loginResult = _loginService.Login(arr[0], arr[3]);
                    if (loginResult.code == 200)
                    {
                        CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsRememberPassKey), "1", DateTime.Now.AddDays(7), Request, Response);
                        CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginCookieKey), arr[0] + "&&&" + arr[3], DateTime.Now.AddDays(7), Request, Response);
                        CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginCookieKey), Request, Response);
                        var user = loginResult.data as Response_User;
                        CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), "1", DateTime.Now.AddMinutes(1), Request, Response);
                        CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginAccountKey), arr[0], Request, Response);
                        CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingRoleIdKey), user.RoleId.ToString(), Request, Response);
                        CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingNameKey), user.Name, Request, Response);
                        return Json(new { result = true, data = "", dataType = "AutoLogin" });
                    }
                    else
                    {
                        CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), "0", Request, Response);
                        CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginCookieKey), Request, Response);
                        CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginAccountKey), Request, Response);
                        CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingRoleIdKey), Request, Response);
                        CookieHelper.SingleTon().ClearCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LogingNameKey), Request, Response);
                        return Json(new { result = true, data = loginResult.data, dataType = "AutoLogin" });
                    }
                }
            }
            if (CookieHelper.SingleTon().GetCookieValue(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsRememberPassKey), Request) == "1")
            {
                string str = CookieHelper.SingleTon().GetCookieValue(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.LoginCookieKey), Request);
                if (!string.IsNullOrEmpty(str))
                {
                    string[] arr = str.Split(new char[3] { '&', '&', '&' });
                    if (!_loginService.AccountExit(c => c.LoginAccount == arr[0]))
                        return Json(new { result = true, data = new { name = arr[0], pw = arr[3] }, dataType = "remember" });
                }
                return Json(new { result = true, data = new { name = "", pw = "" }, dataType = "remember" });
            }

            return Json(new { result = false, data = "", dataType = "null" });
        }
        [HttpPost]
        public JsonResult GetIsLoging()
        {
            return Json(CookieHelper.SingleTon().GetCookieValue(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), Request));
        }


        [HttpPost]

        public JsonResult UpdateIsLoging()
        {
            if (CookieHelper.SingleTon().GetCookieValue(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), Request) == "1")
            {
                CookieHelper.SingleTon().SetCookie(EnumHelper.SingleTon().GetEnumDescription(EnumConfig.IsLoginCookieKey), "1", DateTime.Now.AddMinutes(1), Request, Response);
            }
            return Json("true");
        }
    }
}