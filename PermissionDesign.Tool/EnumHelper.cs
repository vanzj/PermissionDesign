using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PermissionDesign.Tool
{
    /// <summary>
    /// 基础设施-枚举帮助类
    /// </summary>
    public class EnumHelper : Singleton<EnumHelper>
    {

        #region 获取一个枚举的描述
        /// <summary>
        /// 获取一个枚举的描述
        /// </summary>
        /// <param name="enumValue">枚举值</param>
        /// <returns></returns>
        public string GetEnumDescription(Enum enumValue)
        {
            try
            {
                string str = enumValue.ToString();
                System.Reflection.FieldInfo field = enumValue.GetType().GetField(str);
                object[] objs = field.GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
                if (objs == null || objs.Length == 0) return str;
                System.ComponentModel.DescriptionAttribute da = (System.ComponentModel.DescriptionAttribute)objs[0];
                return da.Description;
            }
            catch (Exception)
            {
                return "";
            }
        }
        #endregion

    }
}
