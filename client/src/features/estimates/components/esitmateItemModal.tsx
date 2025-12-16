import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextInput,
  NumberInput,
  Select,
  Stack,
  Group,
} from "@mantine/core";
import type { EstimateItem, EstimateItemType } from "../types";

interface Props {
  opened: boolean;
  close: () => void;
  onSubmit: (item: EstimateItem) => void;
  isLoading: boolean;
  itemToEdit?: EstimateItem | null;
}

export const EstimateItemModal = ({
  opened,
  close,
  onSubmit,
  isLoading,
  itemToEdit,
}: Props) => {
  const [type, setType] = useState<EstimateItemType>("material");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<string | number>(1);
  const [unit, setUnit] = useState("szt");
  const [price, setPrice] = useState<string | number>("");
  const [value, setValue] = useState<string | number>("");

  useEffect(() => {
    if (opened) {
      if (itemToEdit) {
        setType(itemToEdit.type);
        setName(itemToEdit.name);
        setQuantity(itemToEdit.quantity || 1);
        setUnit(itemToEdit.unit || "szt");
        setPrice(itemToEdit.unitPrice || "");
        setValue(itemToEdit.value || "");
      } else {
        setType("material");
        setName("");
        setQuantity(1);
        setUnit("szt");
        setPrice("");
        setValue("");
      }
    }
  }, [opened, itemToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const item: any = { type, name };

    if (type === "material") {
      item.quantity = Number(quantity);
      item.unit = unit;
      item.unitPrice = Number(price);
    } else {
      item.value = Number(value);
    }

    onSubmit(item);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={itemToEdit ? "Edytuj pozycję" : "Dodaj pozycję"}
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <Select
            label="Typ pozycji"
            data={[
              { value: "material", label: "Materiał" },
              { value: "service", label: "Usługa" },
            ]}
            value={type}
            onChange={(val) => setType(val as EstimateItemType)}
            allowDeselect={false}
          />

          <TextInput
            label="Nazwa"
            placeholder={type === "material" ? "np. Cegła" : "np. Malowanie"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-autofocus
          />

          {type === "material" && (
            <>
              <Group grow>
                <NumberInput
                  label="Ilość"
                  value={quantity}
                  onChange={setQuantity}
                  min={0}
                  required
                />
                <Select
                  label="Jednostka"
                  placeholder="Wybierz"
                  data={["szt", "m2", "mb", "worek"]}
                  value={unit}
                  onChange={(val) => setUnit(val || "szt")}
                  allowDeselect={false}
                />
              </Group>
              <NumberInput
                label="Cena jednostkowa (netto)"
                placeholder="0.00"
                value={price}
                onChange={setPrice}
                min={0}
                decimalScale={2}
                fixedDecimalScale
                suffix=" zł"
                required
              />
            </>
          )}

          {type === "service" && (
            <NumberInput
              label="Wartość usługi (netto)"
              placeholder="0.00"
              value={value}
              onChange={setValue}
              min={0}
              decimalScale={2}
              fixedDecimalScale
              suffix=" zł"
              required
            />
          )}

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={close}>
              Anuluj
            </Button>
            <Button type="submit" loading={isLoading}>
              {itemToEdit ? "Zapisz zmiany" : "Dodaj"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};