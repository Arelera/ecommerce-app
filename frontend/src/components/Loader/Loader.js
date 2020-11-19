import S from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={S.container}>
      <div className={S.spinner}></div>
    </div>
  );
}
