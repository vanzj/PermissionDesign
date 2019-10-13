using PermissionDesign.DAL;
using PermissionDesign.Model.Entity;
using PermissionDesign.Model.Request;
using PermissionDesign.Model.Response;
using System;
using System.Collections.Generic;
using System.IO;
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


        public ResponseModel GetRolesByPage(List<Expression<Func<Role, bool>>> wheres,out int total,int pageStart=0,int pageSize=10,int pageCount=1)
        {
            total = 0;
            var templist = _dbContext.role.Where(c=>true); 
            foreach (var where in wheres)
            {
                templist = templist.Where(where);
            }
            templist = templist.Skip((pageStart - 0) * pageSize).Take(pageCount * pageSize);
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
        /// <summary>
        /// 查询角色是否存在服务
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public ResponseModel ExistsRole(Expression<Func<Role, bool>> where)
        {
            if (_dbContext.role.FirstOrDefault(where) != null)
                return new ResponseModel() { code =200};   
            return new ResponseModel() { code = 0, data ="角色不存在"};
        }
        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        public ResponseModel AddRole(Request_AddRole role)
        {
            Role _role = new Role()
            {
                Remark =  role.Remark,
                RoleDesc =  role.RoleDesc,
                RoleEncoding = role.RoleEncoding,
                RoleName =  role.RoleName
            };
            _dbContext.role.Add(_role);
            int i = _dbContext.SaveChanges();

            if (i==1)
                return new ResponseModel(){code = 200,data = "Success"};
            return  new ResponseModel(){code = 0,data = "Failed"};
        }

    }
}
