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

        private RoleService _roleService;
        public RoleController(RoleService roleService)
        {
            _roleService = roleService;
        }

        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 分页查询角色
        /// </summary>
        /// <param name="pageSize">分页大小</param>
        /// <param name="pageCount">每页条数</param>
        /// <param name="search_des">关键字搜索</param>
        /// <param name="startTime">创建时间</param>
        /// <param name="endTime">时间调节</param>
        /// <returns></returns>
        public JsonResult GetRolesByPage(int pageSize,int pageCount, string  search_des,DateTime? startTime,DateTime? endTime)
        {
            var total = 0;
            var wheres = new List<Expression<Func<Role, bool>>>();
            if (!string.IsNullOrEmpty(search_des))
            {
                wheres.Add(c => c.RoleDesc.Contains(search_des));
            }
            if (startTime != null)
            {
             
                wheres.Add(c => c.AddDate >=  startTime);
            }
            if (endTime != null)
            {
                wheres.Add(c => c.AddDate <= endTime );
            }
       var result =     _roleService.GetRolesByPage(wheres, out total, 0, pageSize, pageCount);
            if (result.code == 200)
                return Json(new { total = total, rows = result.data as List<Response_Role> });
            return Json(new { total =0,row=""});
        }
    }
}