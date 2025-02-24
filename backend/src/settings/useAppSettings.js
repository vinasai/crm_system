const useAppSettings = () => {
  let settings = {};
  settings['idurar_app_email'] = 'dilinikandakkulama@gmail.com';
  // http: settings['idurar_base_url'] = 'https://cloud.idurarapp.com';
  http: settings['idurar_base_url'] = 'http://localhost:8888/';
  return settings;
};

module.exports = useAppSettings;
