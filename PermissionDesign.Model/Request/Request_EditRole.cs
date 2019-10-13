using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.Model.Request
{
   public class Request_EditRole
    {
        public int EditId { get; set; }
        public string EditRoleName { get; set; }
        public string EditRoleDesc { get; set; }
        public string EditRemark { get; set; }
    }
}
