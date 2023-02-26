import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context as BlogContext } from '../../../context/AppContext';
import { BasicLayout } from '../../layouts/BasicLayout';
import { ListOfPhotocards } from '../../container/ListOfPhotocards';

export const HomeScreen = () => {
  const params = useParams();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //let listener: any = navigation.addListener('focus', () => {
    // every time this screen gets focus again
    //  getBlogPosts();
    //});
    //return () => {
    // when we don't use this screen anymore we remove the listener
    //listener = undefined;
    //};
  }, []);

  return (
    <BasicLayout
      title="Tu app de fotos de mascotas"
      subtitle="Con Petgram puedes encontrar fotos de animales domésticos muy bonitos"
      showCategories>
      <ListOfPhotocards categoryId={params.id} />
    </BasicLayout>
  );
};
