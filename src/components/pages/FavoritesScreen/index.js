import React from 'react';
import { BasicLayout } from '../../layouts/BasicLayout';
import useGetFavorites from '../../../hooks/useGetFavorites';
import { Grid, Link, Image } from './styles';

export default () => {
  //const { data, loading, error } = useGetFavorites();

  // if (loading) return 'Cargando...';
  // if (error) return <pre>{error.message}</pre>;

  // const { favs } = data;
  // console.log("🚀 ~ file: index.js:13 ~ data", data)
  return (
    <BasicLayout
      title="Tus favoritos"
      subtitle="Aquí puedes encontrar tus favoritos">
      <Grid>
        {/* {favs.map(fav => (
          <Link key={fav.id} to={`/detail/${fav.id}`}>
            <Image key={fav.id} src={fav.src} />
          </Link>
        ))} */}
      </Grid>
    </BasicLayout>
  );
};
