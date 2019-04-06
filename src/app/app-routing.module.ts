import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', loadChildren: './posts/posts.module#PostsPageModule' },
  { path: 'repbases', loadChildren: './repbases/repbases.module#RepbasesPageModule' },
  { path: 'repbases/:repbaseId/:city', loadChildren: './repbases/repbase-detail/repbase-detail.module#RepbaseDetailPageModule' },
  { path: 'repbases/add-repbase', loadChildren: './repbases/add-repbase/add-repbase.module#AddRepbasePageModule', canLoad: [AuthGuard] },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canLoad: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'posts/:postId/:city/:instrument/:mode', loadChildren: './posts/post-detail/post-detail.module#PostDetailPageModule' },
  { path: 'user/:username', loadChildren: './user/user.module#UserPageModule' },
  { path: '**', redirectTo: '/posts'},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
