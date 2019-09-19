
using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.Model.Response
{
  public  class Response_User
    {
        public int Id { get; set; }
        public int? RoleId { get; set; }
        public string LoginAccount { get; set; }

        public string Mobile { get; set; }
        public string Name { get; set; }
        public int Sex { get; set; }
        public string SexName { get; set; }
        public DateTime? Birth { get; set; }
        public int IsEnabled { get; set; }
        public string EnabledName { get; set; }
        public DateTime? RegisterTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Remark { get; set; }
    }
}
