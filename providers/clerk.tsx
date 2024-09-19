import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

// clerk注入
export const MahuClerkProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
          },
          baseTheme: dark,
          variables: {
            colorPrimary: "#3b82f6",
            colorText: "white",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
        }}
        signInFallbackRedirectUrl='/home'
        signUpFallbackRedirectUrl='/home'
      >
        {children}
      </ClerkProvider>
    </>
  );
};
