using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.Model.Entity
{
    public class User
    {
        public int Id { get; set; }
        public int? RoleId { get; set; }
        public string LoginAccount { get; set; }
        public string LoginKey { get; set; }
        public string LoginPassword { get; set; }
        public string Mobile { get; set; }
        public string Name { get; set; }
        public int Sex { get; set; }
        public DateTime? Birth { get; set; }
        public int IsEnabled { get; set; }
        public DateTime? RegisterTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Remark { get; set; }
        public virtual Role Role { get; set; }
    }
}
