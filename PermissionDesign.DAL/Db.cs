using Microsoft.EntityFrameworkCore;
using PermissionDesign.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace PermissionDesign.DAL
{

    public class Db : DbContext
    {

        public Db(DbContextOptions<Db> options) : base(options)
        {

        }
        public Db(string connection)
        {
           
            this._connection = connection;
        }
        private string _connection;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            if (!string.IsNullOrWhiteSpace(_connection))
            {
                optionsBuilder.UseMySQL(_connection);
            }
        }
        /// <summary>
        ///  需要一个特性来和数据库的数据库名对应
        /// </summary>
        public virtual DbSet<User> user { get; set; }
    }
}
