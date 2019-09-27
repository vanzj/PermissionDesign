using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.Model.Response
{
   public class Response_Role
    {
        public int Id { get; set; }
        public string RoleEncoding { get; set; }
        public string RoleName { get; set; }
        public string RoleDesc { get; set; }
        public DateTime AddDate { get; set; }
        public string Remark { get; set; }
    }
}
