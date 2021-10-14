import AppMainLayout from '@/layouts/main-layout';
import ThemeList from './List';
import ThemeCreate from './Create';
import ThemeDelete from './Delete';
import ThemeSchedule from './Schedule';

const Index = (props) => {
  return (
    <AppMainLayout>
      <ThemeList />
      <ThemeCreate />
      <ThemeDelete />
      <ThemeSchedule />
    </AppMainLayout>
  );
};

export default Index;
