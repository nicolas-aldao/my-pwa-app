import React, { useState, useEffect } from 'react';
import { Category } from '../../atoms/Category';
import { List, Item } from './styles';

export const ListOfCategories = () => {
  const [showFixed, setShowFixed] = useState(false);
  const { categories, loading } = useCategoriesData();
  // console.log("🚀 ~ file: index.js:9 ~ ListOfCategories ~ categories", categories)

  function useCategoriesData() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      fetch('https://nagram-clone-api-nicolas-aldao.vercel.app/categories')
        .then(res => res.json())
        .then(response => {
          setCategories(response);
          setLoading(false);
        });
    }, []);

    return { categories, loading };
  }

  useEffect(function () {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200;
      showFixed !== newShowFixed && setShowFixed(newShowFixed);
      setShowFixed(newShowFixed);
    };
    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  });

  const renderList = fixed => (
    <List fixed={fixed}>
      {loading
        ? 'cargando'
        : categories.map(category => (
            <Item key={category.id}>
              <Category {...category} path={`/pet/${category.id}`} />
            </Item>
          ))}
    </List>
  );

  return (
    <>
      {renderList()}
      {showFixed && renderList(true)}
    </>
  );
};
