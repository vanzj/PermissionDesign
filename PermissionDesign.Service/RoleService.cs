using PermissionDesign.DAL;
using PermissionDesign.Model.Entity;
using PermissionDesign.Model.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace PermissionDesign.Service
{
    public class RoleService : ServiceBase
    {
        public RoleService(Db dbContext) : base(dbContext)
        {

        }
         public ResponseModel GetTotalRoles(Expression<Func<Role,bool>>where)
        {
            var templist = _dbContext.role.Where(where);
            ResponseModel response = new ResponseModel();
            response.code = 200;
            response.data = new List<Response_Role>();
            foreach (var item in templist)
            {
                response.data.Add(new Response_Role
                {
                    AddDate = item.AddDate,
                    Id = item.Id,
                    Remark = item.Remark,
                    RoleDesc = item.RoleDesc,
                    RoleEncoding = item.RoleEncoding,
                    RoleName = item.RoleName
                });
            }
            return response;
        }


        public ResponseModel GetRolesByPage(out int total,int pageStart,int pageSize,int pageCount,List<Expression<Func<Role, bool>>> wheres)
        {
            total = 0;
            var templist = _dbContext.role.Where(c=>true); ;
            foreach (var where in wheres)
            {
                templist = _dbContext.role.Where(where);
            }
            templist = templist.Skip((pageStart - 1) * pageSize).Take(pageCount * pageSize);
            total = templist.Count(); 
            ResponseModel response = new ResponseModel();
            response.code = 200;
            response.data = new List<Response_Role>();
            foreach (var item in templist)
            {
                response.data.Add(new Response_Role
                {
                    AddDate = item.AddDate,
                    Id = item.Id,
                    Remark = item.Remark,
                    RoleDesc = item.RoleDesc,
                    RoleEncoding = item.RoleEncoding,
                    RoleName = item.RoleName
                });
            }
            return response;
        }
        

    }
}
