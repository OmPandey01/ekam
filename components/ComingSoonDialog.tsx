import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { TextRenderer } from "@/components/article-page";

interface ComingSoonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComingSoonDialog({
  open,
  onOpenChange,
}: ComingSoonDialogProps) {
  const text = `Hi, glad you\’re interested in this feature! I\’m currently adding these improvements and should have them ready by the
    end of this week. As a solo developer working on this alongside other commitments,
                  some things may take a little time — but I’m making sure they’re done right.
                   Really appreciate your patience and support as I work to make this the best experience possible!`;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className=" w-screen">
        <AlertDialogHeader>
          <AlertDialogTitle>Coming Soon!</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-black font-bold text-2xl"> {text} </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
