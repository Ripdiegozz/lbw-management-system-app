import { useEffect, useState } from 'react';
import { CreateAuthorModal } from '../modals/add-author-modal';
import { CreateCollectionModal } from '../modals/add-collection-modal';
import { CreatePublisherModal } from '../modals/add-publisher-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateAuthorModal />
      <CreateCollectionModal />
      <CreatePublisherModal />
    </>
  );
};
