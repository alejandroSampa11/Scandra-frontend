/* eslint-disable import/no-unresolved */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';


export default function HomeScreen() {
  const screenWidth = Dimensions.get('window').width;

  // Datos de ejemplo para la gráfica
  const expenseData = [
    {
      value: 450,
      color: '#FF6384',
      text: 'Comida',
    },
    {
      value: 280,
      color: '#36A2EB',
      text: 'Transporte',
    },
    {
      value: 180,
      color: '#FFCE56',
      text: 'Entretenimiento',
    },
    {
      value: 120,
      color: '#4BC0C0',
      text: 'Otros',
    },
  ];

  // Datos de ejemplo para los gastos recientes
  const recentExpenses = [
    {
      id: '1',
      establishment: 'Starbucks',
      category: 'Comida',
      amount: 85.50,
      date: '2026-01-30',
      icon: 'restaurant',
      color: '#FF6384',
    },
    {
      id: '2',
      establishment: 'Uber',
      category: 'Transporte',
      amount: 120.00,
      date: '2026-01-29',
      icon: 'car',
      color: '#36A2EB',
    },
    {
      id: '3',
      establishment: 'Netflix',
      category: 'Entretenimiento',
      amount: 199.00,
      date: '2026-01-28',
      icon: 'film',
      color: '#FFCE56',
    },
    {
      id: '4',
      establishment: 'Farmacia Guadalajara',
      category: 'Otros',
      amount: 350.00,
      date: '2026-01-27',
      icon: 'medkit',
      color: '#4BC0C0',
    },
    {
      id: '5',
      establishment: 'Superama',
      category: 'Comida',
      amount: 1250.00,
      date: '2026-01-26',
      icon: 'cart',
      color: '#FF6384',
    },
    {
      id: '6',
      establishment: 'Starbucks',
      category: 'Comida',
      amount: 85.50,
      date: '2026-01-30',
      icon: 'restaurant',
      color: '#FF6384',
    },
    {
      id: '7',
      establishment: 'Uber',
      category: 'Transporte',
      amount: 120.00,
      date: '2026-01-29',
      icon: 'car',
      color: '#36A2EB',
    },
    {
      id: '8',
      establishment: 'Netflix',
      category: 'Entretenimiento',
      amount: 199.00,
      date: '2026-01-28',
      icon: 'film',
      color: '#FFCE56',
    },
    {
      id: '9',
      establishment: 'Farmacia Guadalajara',
      category: 'Otros',
      amount: 350.00,
      date: '2026-01-27',
      icon: 'medkit',
      color: '#4BC0C0',
    },
    {
      id: '10',
      establishment: 'Superama',
      category: 'Comida',
      amount: 1250.00,
      date: '2026-01-26',
      icon: 'cart',
      color: '#FF6384',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
    }
  };

  const openCamera = async () => {
    // Solicitar permisos
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para escanear tickets');
      return;
    }

    // Abrir la cámara
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Aquí puedes procesar la imagen capturada
      console.log('Imagen capturada:', result.assets[0].uri);
      Alert.alert('Éxito', 'Imagen capturada correctamente');
      // TODO: Enviar la imagen al backend para procesarla
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>My Expenses</ThemedText>
        </View>
        <View style={styles.scan}>
          <View style={styles.scanContent}>
            <TouchableOpacity style={styles.scanButton} onPress={openCamera}>
              <Ionicons name="camera" size={48} color="#fff" />
            </TouchableOpacity>
            <ThemedText style={styles.scanTitle}>Escanea y Registra</ThemedText>
            <ThemedText style={styles.scanSubtitle}>Captura tu ticket o recibo</ThemedText>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsContent}>
            <ThemedText style={styles.statsTitle}>Estadísticas del Mes</ThemedText>
            <View style={styles.chartContainer}>
              <View>
                <PieChart
                  data={expenseData}
                  donut
                  radius={65}
                  innerRadius={45}
                  centerLabelComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>$1,030</ThemedText>
                      <ThemedText style={{ fontSize: 11 }}>Total</ThemedText>
                    </View>
                  )}
                />
              </View>
              <ScrollView 
                style={styles.legendContainer}
                showsVerticalScrollIndicator={false}
              >
                {expenseData.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                    <ThemedText style={styles.legendText}>{item.text}</ThemedText>
                    <ThemedText style={styles.legendValue}>${item.value}</ThemedText>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.expensesSection}>
          <ThemedText style={styles.sectionTitle}>Gastos Recientes</ThemedText>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={styles.expensesList}
            style={styles.expensesScrollView}
          >
            {recentExpenses.map((item) => (
              <View key={item.id} style={styles.expenseCard}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={24} color={item.color} />
                </View>
                <View style={styles.expenseInfo}>
                  <ThemedText style={styles.establishmentName}>{item.establishment}</ThemedText>
                  <ThemedText style={styles.categoryText}>{item.category}</ThemedText>
                </View>
                <View style={styles.expenseRight}>
                  <ThemedText style={styles.amountText}>${item.amount.toFixed(2)}</ThemedText>
                  <ThemedText style={styles.dateText}>{formatDate(item.date)}</ThemedText>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    gap: 20,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  expensesSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  expensesScrollView: {
    maxHeight: 400,
  },
  expensesList: {
    gap: 12,
    paddingBottom: 80,
  },
  expenseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 15,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseInfo: {
    flex: 1,
    gap: 4,
  },
  establishmentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryText: {
    fontSize: 13,
    opacity: 0.6,
  },
  expenseRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    opacity: 0.6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scan: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanContent: {
    backgroundColor: '#0a7ea4',
    width: '90%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scanSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContent: {
    backgroundColor: '#f5f5f5',
    width: '90%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 25,
  },
  legendContainer: {
    gap: 10,
    paddingVertical: 5,
    maxHeight: 150,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 130,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  legendText: {
    fontSize: 10,
    flex: 1,
  },
  legendValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});