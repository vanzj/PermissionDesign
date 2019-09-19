using PermissionDesign.DAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.Service
{
    public class ServiceBase
    {
        protected Db _dbContext;
        public ServiceBase(Db dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
