﻿using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.Model.Request
{
  public  class Request_AddRole
    {
      
        public string RoleEncoding { get; set; }
        public string RoleName { get; set; }
        public string RoleDesc { get; set; }
        public string Remark { get; set; }
    }
}
