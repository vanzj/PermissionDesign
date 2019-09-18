using System;
using Microsoft.EntityFrameworkCore;
using PermissionDesign.Model.Entity;
namespace PermissionDesign.Service
{
    /// <summary>
    /// 数据库上下文
    /// </summary>
    public class DataContext : DbContext
    {
        public DataContext() { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies().UseMySql("Data Source=127.0.0.1;Initial Catalog=permissiondesign;User ID=root;Password=123456");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<RoleAction> RoleAction { get; set; }
        public virtual DbSet<User> User { get; set; }
    }
}
