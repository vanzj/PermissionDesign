using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using PermissionDesign.DAL;
using PermissionDesign.Model.Entity;
using PermissionDesign.Model.Response;
using PermissionDesign.Tool;

namespace PermissionDesign.Service
{
    public class LoginService : ServiceBase
    {
        public LoginService(Db dbContext) : base(dbContext)
        {
          
        }

        #region 查询用户是否存在
        public bool AccountExit(Expression<Func<User,bool>> where)
        {
            return _dbContext.user.FirstOrDefault(where) != null;
        }

        #endregion
 public ResponseModel Login(string accout ,string password)
        {
            // arge check
            if (string.IsNullOrEmpty(accout))
                return new ResponseModel { code = 0, result = "Accout is null" };
            if (string.IsNullOrEmpty(password))
                return new ResponseModel { code = 0, result = "Password is null" };

            // 用户 判断

            var loginUser = _dbContext.user.FirstOrDefault(c => c.LoginAccount == accout);
            if (loginUser == null)
                return new ResponseModel { code = 0, result = "Account isn't exit " };
            if (loginUser.IsEnabled == 0)
                return new ResponseModel { code = 0, result = "Account isn't enabled" };
            string pw = PassHelper.SingleTon().EncryptByMd5(loginUser.LoginKey+ password);
            if(loginUser.LoginPassword == pw)
            {
               

                return new ResponseModel { code = 200, data = new Response_User
                {
                    Id = loginUser.Id,
                    RoleId = loginUser.RoleId,
                    Name = loginUser.Name,
                    LoginAccount = loginUser.LoginAccount,
                    IsEnabled = loginUser.IsEnabled

                },result = "Account isn't enabled" };

            }
            return new ResponseModel { code = 0, result = "Login Fail" };
        }

    }
}
