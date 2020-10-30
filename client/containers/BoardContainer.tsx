import React, { Component } from 'react';
import Board from '../utils/Board';
import { connect } from 'react-redux';
import BoardModal from '../components/modals/BoardModal';
import CreateJobModal from '../components/modals/CreateJobModal';
import CreateBoardModal from '../components/modals/CreateBoardModal';
import JobDetailsModal from '../components/modals/JobDetailsModal';
import { TAppState } from '../store';
import * as actions from '../actions/boardActions';
import * as userActions from '../actions/userActions';
import * as jobActions from '../actions/jobActions';
import * as interviewActions from '../actions/interviewActions';
import * as columnActions from '../actions/columnActions';
import * as types from '../constants/types';

import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { CLEAR_COLUMNS, GET_JOB, SET_COLUMNS} from '../constants/actionTypes';

const mapStateToProps = (store: TAppState) => ({
  boardId: store.boards.id,
  boardName: store.boards.name,
  boards: store.boards.boards,
  user: store.users.name,
  userId: store.users.id,
  allJobs: store.jobs.jobs,
  columns: store.columns,
  allInterviews: store.interviews.interviews
});

const mapDispatchToProps = (dispatch: any) => ({
  setBoard: (boardObj: types.IBoardInfo) => {
    console.log('dispatched set board', boardObj);
    dispatch(actions.setBoard(boardObj));
  },
  createBoard: (boardObj: types.IBoardInput) => {
    console.log('dispatched create board', boardObj);
    dispatch(actions.createBoard(boardObj));
  },
  clearBoard: () => {
    console.log('dispatched clear board');
    dispatch(actions.clearBoard());
  },
  clearUserInfo: () => {
    console.log('dispatched clear info');
    dispatch(userActions.clearUserInfo());
  },
  createJob: (jobObj: types.IJobInput) => {
    console.log('dispatched create job');
    dispatch(jobActions.createJob(jobObj));
  },
  getJob: (boardId: number) => {
    console.log('dispatched get job');
    dispatch(jobActions.getJob(boardId));
  },
  clearJob: () => {
    console.log('dispatched clear job');
    dispatch(jobActions.clearJob());
  },
  updateDetails: (detailsObj: types.IDetails) => {
    console.log('dispatched update details');
    dispatch(jobActions.updateDetails(detailsObj));
  },
  deleteJob: (jobId: number, boardId: number) => {
    console.log('dispatched delete job');
    dispatch(jobActions.deleteJob(jobId, boardId));
  },
  updateStatus: (jobId: number, status: string) => {
    console.log('dispatched update status');
    dispatch(jobActions.updateStatus(jobId, status));
  },
  // updateJobs is for dnd functionality - update state before updating db
  updateJobs: (allJobs: any[]) => {
    console.log('dispatched update jobs');
    dispatch({
      type: GET_JOB,
      payload: allJobs,
    });
  },
  getInterview: (jobId: number) => {
    console.log('dispatched get interview');
    dispatch(interviewActions.getInterview(jobId));
  },
  createInterview: (title: string, jobId: number) => {
    console.log('dispatched create interview');
    dispatch(interviewActions.createInterview(title, jobId));
  },
  setColumns: (allJobs: any[]) => {
    console.log('dispatched set columns');
    dispatch({
      type: SET_COLUMNS,
      payload: allJobs,
    });
  },
  clearColumns: () => {
    console.log('dispatched clear columns');
    dispatch({ type: CLEAR_COLUMNS });
  },

  // for dnd, updating column ui before updating db
  updateListOrder: (jobs:any[]) => {
    console.log('dispatched update list order');
    dispatch(columnActions.updateListOrder(jobs));
  },
});

type BoardProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface BoardState {
  showBoardModal: boolean;
  showJobModal: boolean;
  showCreateBoard: boolean;
  showDetailsModal: boolean;
  currentColumn: { columnName: string; columnOrder: number | null };
  selectedJob: types.ISelectedJob | null;

  dropdownItems: JSX.Element[] | [];
}

class BoardContainer extends Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      showBoardModal: false,
      showJobModal: false,
      showCreateBoard: false,
      showDetailsModal: false,
      currentColumn: { columnName: '', columnOrder: null },
      selectedJob: null,
      dropdownItems: [],
    };

    this.selectBoard = this.selectBoard.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.createDropdown = this.createDropdown.bind(this);
    this.renderCreateBoard = this.renderCreateBoard.bind(this);
    this.renderDetailsModal = this.renderDetailsModal.bind(this);
  }

  // render modal if board name isn't set
  componentDidMount() {
    this.createDropdown();
    if (this.props.boardName === null) this.setState({ showBoardModal: true });
  }

  // update drop down menu when users switch boards
  componentDidUpdate(prevProps: any) {
    if (prevProps.boardName !== this.props.boardName) {
      this.createDropdown();
    }
  }

  // user selects board and modal closes
  selectBoard(id: number, name: string) {
    const boardObj: types.IBoardInfo = {
      id: id,
      name: name,
    };

    this.props.setBoard(boardObj);
    this.createDropdown();
    this.props.getJob(id);
    this.setState({ showBoardModal: false });
  }

  addBoard(id: number, name: string) {
    const boardObj: types.IBoardInput = {
      name: name,
      user_id: id,
    };
    this.props.createBoard(boardObj);
    this.setState({ showBoardModal: false, showCreateBoard: false });
  }

  // reset state
  handleSignout() {
    this.props.clearUserInfo();
    this.props.clearBoard();
    this.props.clearJob();
    this.props.clearColumns();
  }

  handleOpen(e: any) {
    //determine list order for column
    const order = this.props.columns[e.target.id].length;
    this.setState({
      showJobModal: true,
      currentColumn: { columnName: e.target.id, columnOrder: order },
    });
  }

  handleClose() {
    this.setState({
      showBoardModal: false,
      showJobModal: false,
      showCreateBoard: false,
      showDetailsModal: false,
      currentColumn: { columnName: '', columnOrder: null },
    });
  }

  renderCreateBoard() {
    this.setState({ showCreateBoard: true });
  }

  renderDetailsModal(jobId: number) {
    console.log('clicked job card');
    const { allJobs } = this.props;
    let selectedJob;
    for (let i = 0; i < allJobs.length; i++) {
      if (allJobs[i]._id === jobId) {
        selectedJob = allJobs[i];
        console.log('selected', selectedJob);
      }
    }
    this.setState({ selectedJob, showDetailsModal: true });
  }

  // create dropdown item for each board - selected board will become the active board
  createDropdown() {
    const { boards, boardName } = this.props;
    const items: JSX.Element[] = [];
    if (boards) {
      for (let i = 0; i < boards.length; i++) {
        if (boards[i].name !== boardName) {
          items.push(
            <Dropdown.Item
              id="dropItem"
              onClick={() => this.selectBoard(boards[i]._id, boards[i].name)}
            >
              {boards[i].name}
            </Dropdown.Item>
          );
        }
      }
      this.setState({ dropdownItems: items });
    }
  }

  render() {
    // below modals will render based on local state which is determined by user's actions
    return (
      <>
        <BoardModal
          show={this.state.showBoardModal}
          user={this.props.user}
          userId={this.props.userId}
          boards={this.props.boards}
          selectBoard={this.selectBoard}
          addBoard={this.addBoard}
          close={this.handleClose}
        />
        <CreateJobModal
          show={this.state.showJobModal}
          close={this.handleClose}
          column={this.state.currentColumn}
          boardId={this.props.boardId}
          createJob={this.props.createJob}
        />
        <CreateBoardModal
          show={this.state.showCreateBoard}
          close={this.handleClose}
          user={this.props.user}
          userId={this.props.userId}
          addBoard={this.addBoard}
          boards={this.props.boards}
        />
        <JobDetailsModal
          show={this.state.showDetailsModal}
          close={this.handleClose}
          selectedJob={this.state.selectedJob}
          updateDetails={this.props.updateDetails}
          boardId={this.props.boardId}
          deleteJob={this.props.deleteJob}
          allInterviews={this.props.allInterviews}
          getInterview={this.props.getInterview}
          createInterview={this.props.createInterview}
        />
        <div className="boardContainer">
          <div className="boardHeader">
            <div className="board-options">
              <DropdownButton
                id="dropdown-basic-button"
                title={this.props.boardName || ''}
              >
                {this.state.dropdownItems}
              </DropdownButton>
              <Button className="addBoard-btn" onClick={this.renderCreateBoard}>
                {' '}
                +{' '}
              </Button>
            </div>
            <h3>{this.props.boardName}</h3>
            <Button className="sign-out" onClick={this.handleSignout}>
              Sign Out
            </Button>
          </div>

          <Board
            boardId={this.props.boardId}
            boardName={this.props.boardName}
            open={this.handleOpen}
            getJob={this.props.getJob}
            allJobs={this.props.allJobs}
            details={this.renderDetailsModal}
            updateStatus={this.props.updateStatus}
            updateJobs={this.props.updateJobs}
            columns={this.props.columns}
            setColumns={this.props.setColumns}
            updateListOrder={this.props.updateListOrder}
          />
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
