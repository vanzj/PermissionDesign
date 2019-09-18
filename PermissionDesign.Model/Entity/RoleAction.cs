using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.Model.Entity
{
    public class RoleAction
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string ActionEncodings { get; set; }
        public string Remark { get; set; }
        public virtual Role Role { get; set; }
    }
}
