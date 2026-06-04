import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/signin(.*)",
  "/login(.*)",
  "/(.*)",
]);


const isAuthRoute = createRouteMatcher([
  "/login(.*)",
  "/signup(.*)",
  "/(.*)",
]);

const isBuyerRoute = createRouteMatcher([
  "/buyer(.*)",
]);

const isSellerRoute = createRouteMatcher([
  "/seller(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  const role = sessionClaims?.publicMetadata?.role as
    | "buyer"
    | "seller"
    | undefined;

  // No autenticado
  if (!userId) {
    if (!isAuthRoute(req)) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    return NextResponse.next();
  }

  // Ya autenticado
  if (isAuthRoute(req)) {
    if (role === "seller") {
      return NextResponse.redirect(
        new URL("/seller", req.url)
      );
    }

    return NextResponse.redirect(
      new URL("/buyer", req.url)
    );
  }

  // Buyer intentando entrar a Seller
  if (role === "buyer" && isSellerRoute(req)) {
    return NextResponse.redirect(
      new URL("/buyer", req.url)
    );
  }

  // Seller intentando entrar a Buyer
  if (role === "seller" && isBuyerRoute(req)) {
    return NextResponse.redirect(
      new URL("/seller", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};