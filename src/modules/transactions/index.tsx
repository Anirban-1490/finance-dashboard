import { Button } from "@/components/ui/button";
import { TransactionTable } from "./components/table";
import { ListFilter, Plus } from "lucide-react";
import { TransactionDialog } from "./components/dialog/transaction-dialog";
import { useFinanceData } from "@/store/finance-data";
import { Filter } from "./components/dialog/filter";

export function TransactionMain() {
  const data = useFinanceData((state) => state.data?.transactions || []);
  return (
    <section className="w-full min-h-dvh ">
      <main className="max-md:mt-[4rem] min-md:ml-[19.5rem] p-8 flex flex-col gap-6">
        <h1 className="text-primary">Transactions</h1>
        <div className="flex justify-end gap-5">
          <Filter>
            <Button
              variant="outline"
              className="border-sidebar-border bg-transparent hover:bg-input text-foreground transition-colors"
            >
              <ListFilter size={18} className="mr-2" />
              Filter
            </Button>
          </Filter>
          <TransactionDialog>
            <Button variant={"primary"}>
              <Plus /> Add Transaction
            </Button>
          </TransactionDialog>
        </div>
        <TransactionTable
          showActions
          data={data}
          enablePagination
          pageSize={10}
        />
      </main>
    </section>
  );
}
