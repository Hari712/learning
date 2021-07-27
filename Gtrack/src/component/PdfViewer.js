import React from 'react'
import { View, TouchableOpacity, StyleSheet} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal'
import { CloseIcon, DownloadIcon } from '../component/SvgComponent'
import Pdf from 'react-native-view-pdf';

const PdfViewerDialog = (props) => {

    const { isVisible, pdfData, onTapClose, onDownload} = props
   
    function hideDialog() {
        onTapClose && onTapClose()
    }

    function renderBody() {
        return (
            <View style={styles.container}>
                 <TouchableOpacity style={styles.downloadIcon} onPress={() => onDownload()}>
                    <DownloadIcon height={hp(5)} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeIcon} onPress={() => hideDialog()}>
                    <CloseIcon height={hp(5)} />
                </TouchableOpacity>
                <Pdf
                    resource={pdfData}
                    style={styles.pdf}
                    resourceType= 'base64'
                />
            </View>
        )
    }

    return (
        <Modal
            testID={'modal'}
            isVisible={isVisible}
            propagateSwipe={true}>
            {renderBody()}
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: hp(1.5),
        marginTop: hp(2),
        backgroundColor: 'white',
        paddingHorizontal: hp(2),
        borderRadius: hp(1)
    },
    downloadIcon: {
        position: 'absolute',
        left: 10,
        top: 0
    },
    closeIcon: {
        position: 'absolute', 
        right: 10, 
        top: 0
    },
    pdf: {
        flex: 1,
        width: wp(80), 
        alignSelf: 'center',  
        height:hp(60), 
        margin: hp(4)
    }
})

export default PdfViewerDialog
