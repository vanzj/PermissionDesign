using Microsoft.AspNetCore.Http;
using System;
namespace PermissionDesign.Tool
{
    /// <summary>
    /// Cookie帮助类
    /// </summary>
    public class CookieHelper : Singleton<CookieHelper>
    {
        /// <summary>  
        /// 清除指定Cookie  
        /// </summary>  
        public void ClearCookie(string cookiename,HttpRequest request, HttpResponse response)
        {
            var value = request.Cookies[cookiename];
            if (!string.IsNullOrEmpty(value))
            {
                response.Cookies.Delete(cookiename);
            }
        }
        /// <summary>  
        /// 获取指定Cookie值  
        /// </summary>
        public string GetCookieValue(string cookiename, HttpRequest request)
        {
            string value = request.Cookies[cookiename];
            return value;
        }
        /// <summary>  
        /// 添加一个Cookie（24小时过期）  
        /// </summary>  
        /// <param name="cookiename">cookie名称</param>  
        /// <param name="cookievalue">cookie值</param>  
        public void SetCookie(string cookiename, string cookievalue, HttpRequest request, HttpResponse response)
        {
            ClearCookie(cookiename,request,response);
            SetCookie(cookiename, cookievalue, DateTime.Now.AddDays(1.0),request,response);
        }
        /// <summary>  
        /// 添加一个Cookie  
        /// </summary>  
        public void SetCookie(string cookiename, string cookievalue, DateTime expires, HttpRequest request, HttpResponse response)
        {
            ClearCookie(cookiename,request,response);
            response.Cookies.Append(cookiename, cookievalue, new CookieOptions() {Expires=expires });
        }
    }
}
