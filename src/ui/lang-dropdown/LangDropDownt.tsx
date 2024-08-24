'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import type { Key, ReactElement, SetStateAction } from 'react';
import { useMemo, useState } from 'react';

const LangDropDownt = (): ReactElement => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['EN']));

  const selectedValue = useMemo(() => Array.from(selectedKeys).join(', ').replaceAll('_', ' '), [selectedKeys]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys as SetStateAction<Set<string>>)}
        onAction={(key: Key) => console.log(`LANG ${key}`)}
      >
        <DropdownItem key="EN">EN</DropdownItem>
        <DropdownItem key="RU">RU</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LangDropDownt;
