using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace PermissionDesign.Model
{
  public  enum EnumConfig
    {
        [Description("SuperAdmin")]
        SuperAdminEncoding,
        /// <summary>
        /// 登录的Cookie键
        /// </summary>
        [Description("LoginCookie")]
        LoginCookieKey,
        /// <summary>
        /// 是否正在登录的Cookie键
        /// </summary>
        [Description("IsLoginCookie")]
        IsLoginCookieKey,
        /// <summary>
        /// 正在登录的用户账号键
        /// </summary>
        [Description("LoginAccount")]
        LoginAccountKey,
        /// <summary>
        /// 正在登录的用户Id键
        /// </summary>
        [Description("LogingRoleId")]
        LogingRoleIdKey,
        /// <summary>
        /// 正在登录的用户名键
        /// </summary>
        [Description("LogingName")]
        LogingNameKey,
        [Description("IsRememberPass")]
        IsRememberPassKey,
    }
}   
