using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.Model.Entity
{
    public class Role
    {
        public Role()
        {
            this.User = new HashSet<User>();
            this.RoleAction = new HashSet<RoleAction>();
        }
        public int Id { get; set; }
        public string RoleEncoding { get; set; }
        public string RoleName { get; set; }
        public string RoleDesc { get; set; }
        public DateTime AddDate { get; set; }
        public string Remark { get; set; }
        public virtual ICollection<User> User { get; set; }
        public virtual ICollection<RoleAction> RoleAction { get; set; }
    }
}
