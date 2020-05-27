using OIDC.Models;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OIDC.Data.DatabaseInitializer
{
    public class DatabaseInitializer: IDatabaseInitializer
    { 
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DatabaseInitializer(UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        public async Task Initialize(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();

        if (context.Users.Any())
        {
            return; // Db has been seeded.
        }

        // Creates Roles.
        await _roleManager.CreateAsync(new IdentityRole("administrator"));
        await _roleManager.CreateAsync(new IdentityRole("user"));

        // Seeds an admin user.
        var user = new ApplicationUser
        {
            GivenName = "Ajinkya",
            FamilyName = "Utekar",
            AccessFailedCount = 0,
            Email = "test@bluepearlinfotech.com",
            EmailConfirmed = false,
            LockoutEnabled = true,
            NormalizedEmail = "test@bluepearlinfotech.com",
            NormalizedUserName = "test@bluepearlinfotech.com",
            TwoFactorEnabled = false,
            UserName = "test@bluepearlinfotech.com"
        };

        var result = await _userManager.CreateAsync(user, "Admin01*");

        if (result.Succeeded)
        {
            var adminUser = await _userManager.FindByNameAsync(user.UserName);
            // Assigns the administrator role.
            await _userManager.AddToRoleAsync(adminUser, "administrator");
            // Assigns claims.
            var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.GivenName, value: user.GivenName),
                    new Claim(type: JwtClaimTypes.FamilyName, value: user.FamilyName),
                };
            await _userManager.AddClaimsAsync(adminUser, claims);
        }
    }
}
}
