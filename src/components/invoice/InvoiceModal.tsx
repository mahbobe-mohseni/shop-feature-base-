import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Invoice from "./Invoice";

export default function InvoiceModal({
  data,
  className,
  visible,
  setVisible,
}: {
  data: any;
  className?: string;
  visible: boolean;
  setVisible: (i: boolean) => void;
}) {
  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogTitle className="sr-only">نمایش فاکتور</DialogTitle>
      <DialogContent className="w-full lg:max-w-4xl lg:min-w-4xl overflow-y-auto max-h-screen">
        <Invoice data={data} className={className} />
      </DialogContent>
    </Dialog>
  );
}
