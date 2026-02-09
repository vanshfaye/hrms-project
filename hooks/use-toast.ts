// hooks/use-toast.ts
export function useToast() {
  const toast = ({ title, description }: { title: string; description?: string }) => {
    console.log("Toast:", title, description)
    // Replace with your UI toast logic
  }
  return { toast }
}
