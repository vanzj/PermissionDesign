using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PermissionDesign.Tool
{
    /// <summary>
    /// 单例
    /// </summary>
    public class Singleton<T> where T:class,new()
    {
        private static T _singleTon;
        /// <summary>
        /// 获取实例
        /// </summary>
        public static T SingleTon()
        {
            if(_singleTon==null)
            {
                _singleTon = new T();
            }
            return _singleTon;
        }
    }
}
