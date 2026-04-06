import React, { useState, type PropsWithChildren } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import type { FinanceCategory, Transaction, TransactionType } from "@/type";
import { addTransaction } from "@/api/transaction";
import { getId } from "@/lib/utils";
import dayjs from "dayjs";
import { useFinanceData } from "@/store/finance-data";

export function TransactionDialog({
  children,
  transaction,
  isOpen,
}: PropsWithChildren & { transaction?: Transaction; isOpen?: boolean }) {
  const initialTransaction = transaction ?? {
    name: "",
    amount: 0,
    date: "",
    category: "Services",
    type: "expense",
    id: "",
  };

  const [open, setOpen] = useState(!!isOpen);
  const setFinanceData = useFinanceData((state) => state.setData);
  const { theme } = useTheme();
  const [formData, setFormData] = useState<Transaction>(initialTransaction);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction = {
      ...formData,
      amount: parseFloat(`${formData.amount}`),
      id: formData.id ? formData.id : getId(),
      date: dayjs(formData.date).format("YYYY-MM-DD"),
    };
    const financeData = addTransaction(newTransaction as Transaction);
    setFinanceData(financeData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Name
            </label>
            <Input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              id="name"
              placeholder="Netflix Subscription"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="text-sm font-medium mb-1">
                Amount($)
              </label>
              <Input
                required
                type="number"
                min={0}
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(`${e.target.value}`),
                  })
                }
                id="amount"
              />
            </div>

            <div>
              <label htmlFor="type" className="text-sm font-medium mb-1">
                Type
              </label>
              <Select
                value={formData.type}
                required
                onValueChange={(val: TransactionType) =>
                  setFormData({ ...formData, type: val })
                }
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-medium mb-1">
              Category
            </label>
            <Select
              value={formData.category}
              onValueChange={(val: FinanceCategory) =>
                setFormData({ ...formData, category: val })
              }
              required
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Services">Services</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Vehicles">Vehicles</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="date" className="text-sm font-medium mb-1">
              Date
            </label>
            <Input
              required
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className={` [color-scheme:${theme}]`}
            />
          </div>

          <Button type="submit" variant={"primary"} className="w-fullmt-4">
            Save Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
