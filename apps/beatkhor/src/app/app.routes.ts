import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "authentication",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];
