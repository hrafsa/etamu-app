import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {usePengajuan} from '../pengajuan/PengajuanContext';

function NextP42Screen({navigation}) {
  const {setField, form} = usePengajuan();
  const [date, setDate] = useState(form.tanggal_kunjungan ? new Date(form.tanggal_kunjungan) : new Date());
  const [time, setTime] = useState(form.waktu_kunjungan ? new Date(`1970-01-01T${form.waktu_kunjungan}:00`) : new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  useEffect(() => {
    const d = date.toISOString().split('T')[0];
    setField('tanggal_kunjungan', d);
  }, [date, setField]);
  useEffect(() => {
    const h = time.getHours().toString().padStart(2,'0');
    const m = time.getMinutes().toString().padStart(2,'0');
    setField('waktu_kunjungan', `${h}:${m}`);
  }, [time, setField]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.header}>
        <Image
          source={require('../../assets/image/dprd.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>E-Tamu</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Pilih Tanggal & Waktu Kedatangan</Text>

        <View style={styles.pickerContainer}>
          {/* TOMBOL PILIH TANGGAL */}
          <TouchableOpacity
            style={styles.button1}
            onPress={() => setOpenDate(true)}>
            <Text style={styles.buttonText}>Pilih Tanggal</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              fontFamily: 'DMSans-Regular',
              marginLeft: 5,
            }}>
            =
          </Text>
          <Text style={styles.selectedText1}>{date.toDateString()}</Text>
          <DatePicker
            modal
            open={openDate}
            date={date}
            mode="date"
            onConfirm={selectedDate => {
              setOpenDate(false);
              setDate(selectedDate);
            }}
            onCancel={() => setOpenDate(false)}
          />
        </View>

        <View style={styles.pickerContainer}>
          {/* TOMBOL PILIH WAKTU */}
          <TouchableOpacity
            style={styles.button2}
            onPress={() => setOpenTime(true)}>
            <Text style={styles.buttonText}>Pilih Waktu</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              fontFamily: 'DMSans-Regular',
              marginLeft: 5,
            }}>
            =
          </Text>
          <Text style={styles.selectedText2}>{time.toLocaleTimeString()}</Text>
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              fontFamily: 'DMSans-Regular',
              marginLeft: 5,
            }}>
            WIB
          </Text>
          <DatePicker
            modal
            open={openTime}
            date={time}
            mode="time"
            onConfirm={selectedTime => {
              setOpenTime(false);
              setTime(selectedTime);
            }}
            onCancel={() => setOpenTime(false)}
          />
        </View>

        <View style={{marginTop: 25, flexDirection: 'row'}}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('NextP32')}
              style={{
                backgroundColor: '#0386D0',
                alignItems: 'center',
                width: 75,
                height: 35,
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#FFFF',
                  fontSize: 14,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('NextP52')}
              style={{
                backgroundColor: '#0386D0',
                alignItems: 'center',
                width: 75,
                height: 35,
                justifyContent: 'center',
                borderRadius: 15,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#FFFF',
                  fontSize: 14,
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 60,
  },
  title: {
    color: '#000000',
    fontFamily: 'ADLaMDisplay-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#F6F6F6',
    width: 360,
    height: 260,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  },
  subtitle: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'DMSans-Regular',
    fontSize: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedText1: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    marginLeft: 10,
  },
  selectedText2: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    marginLeft: 10,
    // fontWeight: 'bold',
  },
  button1: {
    backgroundColor: '#FFFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#FFFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default NextP42Screen;
